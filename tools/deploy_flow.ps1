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
if (-not $githubToken) { $githubToken = [WinCred]::ReadSecret("git:https://Janeferdinant@github.com") }
if (-not $githubToken) { $githubToken = [WinCred]::ReadSecret("git:https://x-access-token@github.com") }

$vercelToken = [WinCred]::ReadSecret("Vercel")

if (-not $githubToken) {
    Write-Error "Could not retrieve GitHub token from Windows Credential Manager."
    exit 1
}
if (-not $vercelToken) {
    Write-Error "Could not retrieve Vercel token from Windows Credential Manager."
    exit 1
}

Write-Host ">>> [1/5] Retrieved credentials from Windows Credential Manager successfully."

# 1. Create or get GitHub repo
$ghHeaders = @{
    "Authorization" = "token $githubToken"
    "User-Agent" = "PowerShell-Deployer"
    "Accept" = "application/vnd.github.v3+json"
}

$repoName = "deep-learning-virtual-lab"
$repoUrl = "https://github.com/Janeferdinant/$repoName"

Write-Host ">>> [2/5] Checking GitHub repository: $repoName..."
try {
    $existingRepo = Invoke-RestMethod -Uri "https://api.github.com/repos/Janeferdinant/$repoName" -Headers $ghHeaders
    Write-Host "Repository already exists at: $($existingRepo.html_url)"
} catch {
    Write-Host "Creating GitHub repository: $repoName..."
    $createBody = @{
        name = $repoName
        description = "Interactive Deep Learning Virtual Laboratory Learning Platform (MRCET Autonomous R20A6683)"
        private = $false
        has_issues = $true
        has_wiki = $true
    } | ConvertTo-Json

    $newRepo = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $ghHeaders -Body $createBody -ContentType "application/json"
    Write-Host "Created new GitHub repository at: $($newRepo.html_url)"
}

# 2. Initialize Git and commit
Write-Host ">>> [3/5] Staging files and creating initial commit..."
if (-not (Test-Path .git)) {
    git init -b main
} else {
    git branch -M main
}

git config user.name "Janeferdinant"
git config user.email "janeferdinant@gmail.com"

git add .
git commit -m "feat: complete interactive Deep Learning virtual lab platform (MRCET R20A6683)"

# 3. Push to GitHub
Write-Host ">>> [4/5] Pushing to GitHub..."
$authRemoteUrl = "https://Janeferdinant:$githubToken@github.com/Janeferdinant/$repoName.git"
$cleanRemoteUrl = "https://github.com/Janeferdinant/$repoName.git"

git remote remove origin 2>$null
git remote add origin $authRemoteUrl
git push -u origin main --force

# Restore clean remote url without token
git remote set-url origin $cleanRemoteUrl
Write-Host "Successfully pushed to GitHub: $cleanRemoteUrl"

# 4. Deploy to Vercel
Write-Host ">>> [5/5] Deploying to Vercel via Vercel CLI..."
$env:VERCEL_TOKEN = $vercelToken

npx vercel --token $vercelToken --yes --prod

Write-Host ">>> Deployment completed successfully!"
