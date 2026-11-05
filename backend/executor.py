import io
import os
import sys
import time
import base64
import traceback
import contextlib
import matplotlib

# Set non-interactive matplotlib backend before importing pyplot
matplotlib.use("Agg")
import matplotlib.pyplot as plt

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

def execute_python_code(code: str, timeout_seconds: float = 15.0) -> dict:
    """
    Executes user-provided Python code in an isolated dictionary environment,
    capturing stdout, stderr, execution time, and any generated matplotlib plots.
    """
    stdout_buffer = io.StringIO()
    stderr_buffer = io.StringIO()
    images = []

    # Close any lingering matplotlib figures before starting
    plt.close("all")

    # Save original working directory
    original_cwd = os.getcwd()

    start_time = time.perf_counter()
    success = True

    try:
        # Change cwd to data directory so relative paths like 'placement.csv' work seamlessly
        os.chdir(DATA_DIR)

        # Build custom global environment
        exec_globals = {
            "__name__": "__main__",
            "__builtins__": __builtins__,
        }

        with contextlib.redirect_stdout(stdout_buffer), contextlib.redirect_stderr(stderr_buffer):
            exec(code, exec_globals)

        # Inspect if matplotlib figures were created
        fignums = plt.get_fignums()
        for fignum in fignums:
            fig = plt.figure(fignum)
            img_buf = io.BytesIO()
            fig.savefig(img_buf, format="png", bbox_inches="tight", dpi=100)
            img_buf.seek(0)
            b64_str = base64.b64encode(img_buf.read()).decode("utf-8")
            images.append(f"data:image/png;base64,{b64_str}")
            img_buf.close()

    except Exception:
        success = False
        traceback.print_exc(file=stderr_buffer)
    finally:
        plt.close("all")
        os.chdir(original_cwd)
        execution_time = round(time.perf_counter() - start_time, 4)

    return {
        "success": success,
        "stdout": stdout_buffer.getvalue(),
        "stderr": stderr_buffer.getvalue(),
        "execution_time": execution_time,
        "images": images
    }

