param(
    [switch]$CheckOnly
)

$code = @'
using System;
using System.Text;
using System.Runtime.InteropServices;

public class WinCred {
    [DllImport("advapi32.dll", EntryPoint = "CredReadW", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool CredRead(string target, int type, int reservedFlag, out IntPtr credentialPtr);

    [DllImport("advapi32.dll", EntryPoint = "CredFree", SetLastError = true)]
    public static extern void CredFree(IntPtr cred);

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public int Flags;
        public int Type;
        public string TargetName;
        public string Comment;
        public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
        public int CredentialBlobSize;
        public IntPtr CredentialBlob;
        public int Persist;
        public int AttributeCount;
        public IntPtr Attributes;
        public string TargetAlias;
        public string UserName;
    }

    public static string ReadSecret(string target) {
        IntPtr credPtr;
        if (CredRead(target, 1, 0, out credPtr)) {
            CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(credPtr, typeof(CREDENTIAL));
            byte[] bytes = new byte[cred.CredentialBlobSize];
            Marshal.Copy(cred.CredentialBlob, bytes, 0, cred.CredentialBlobSize);
            CredFree(credPtr);

            // Decode: try Unicode first, if it contains null chars or looks odd, try UTF8
            string unicodeStr = Encoding.Unicode.GetString(bytes);
            if (!unicodeStr.Contains("\0") && unicodeStr.Length > 0) {
                return unicodeStr;
            }
            return Encoding.UTF8.GetString(bytes).TrimEnd('\0');
        }
        return null;
    }
}
'@

if (-not ([System.Management.Automation.PSTypeName]'WinCred').Type) {
    Add-Type -TypeDefinition $code
}

$githubToken = [WinCred]::ReadSecret("git:https://github.com")
if (-not $githubToken) {
    $githubToken = [WinCred]::ReadSecret("git:https://Janeferdinant@github.com")
}
if (-not $githubToken) {
    $githubToken = [WinCred]::ReadSecret("git:https://x-access-token@github.com")
}

$vercelToken = [WinCred]::ReadSecret("Vercel")

Write-Host "Credentials found:"
Write-Host "GitHub Token: $(if ($githubToken) { 'Available (' + $githubToken.Length + ' chars)' } else { 'Not found' })"
Write-Host "Vercel Token: $(if ($vercelToken) { 'Available (' + $vercelToken.Length + ' chars)' } else { 'Not found' })"

# Test GitHub authentication
if ($githubToken) {
    try {
        $ghHeaders = @{
            "Authorization" = "token $githubToken"
            "User-Agent" = "PowerShell-Deployer"
            "Accept" = "application/vnd.github.v3+json"
        }
        $ghUser = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $ghHeaders
        Write-Host "GitHub Authenticated as: $($ghUser.login) ($($ghUser.name))"
    } catch {
        Write-Host "GitHub Auth Failed: $($_.Exception.Message)"
    }
}

# Test Vercel authentication
if ($vercelToken) {
    try {
        $vercelHeaders = @{
            "Authorization" = "Bearer $vercelToken"
            "User-Agent" = "PowerShell-Deployer"
        }
        $vercelUser = Invoke-RestMethod -Uri "https://api.vercel.com/v2/user" -Headers $vercelHeaders
        Write-Host "Vercel Authenticated as: $($vercelUser.user.username) ($($vercelUser.user.email))"
    } catch {
        Write-Host "Vercel Auth Failed: $($_.Exception.Message)"
    }
}
