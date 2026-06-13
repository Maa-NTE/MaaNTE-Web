# GitHub DMCA / Abuse Reporting Template (AGPL-3.0)

Used for quickly reporting fake repositories, data transfer repositories, and repositories containing malicious binary data.

Applicable to:

- Copyright holders (or their authorized representatives)
- Original projects using the AGPL-3.0 license
- Repositories with risks of non-compliant distribution, fake distribution, or malicious samples.

## Official entrance

- DMCA（Copyright removal）：<https://github.com/contact/dmca>
- Abuse（Abuse/Malicious Distribution）：<https://support.github.com/contact/report-abuse?category=report-abuse&report=other&report_type=unspecified>

Recommended to mention both: `DMCA` for copyright, and `Abuse` for security risks.

## Pre-submission checklist

1. Original Repository URL (Official Repository)
2. Reported Repository URL (Infringing Repository)
3. Infringing Template Download URL (Publishing Link)
4. Sample Hash Value (SHA256)
5. Detection Result (e.g., `QVM.Gen.196650`) and Detection Report File
6. Key Points of AGPL-3.0 Violation (Provided Source Code, Modification Instructions, License Statement, etc.)
7. Contact Information (Name, Email, Address, Phone Number)

## DMCA Form template

The following fields are arranged in the order of frequently asked questions in the GitHub form and can be copied directly.

### Are you the copyright holder or authorized...?

```text
Yes, I am the copyright holder.
```

If acting as an agent:

```text
I am authorized to act on behalf of the copyright owner.
```

### Please describe the nature of your copyright ownership...

```text
I am the copyright owner of the original MaaNTE source code, associated release artifacts, and accompanying documentation, and I hold the exclusive rights to reproduce, distribute, and prepare derivative works. I have not authorized the repository identified in this notice to copy, publish, or distribute those copyrighted materials.
```

### Please provide a detailed description of the original copyrighted work...

```text
The original copyrighted work is the MaaNTE project, which is copyrighted by us and released under the GNU Affero General Public License v3.0 (AGPL-3.0). Our work includes the source code, build and packaging scripts, task/pipeline definitions, UI assets, and release artifacts. AGPL-3.0 allows copying and redistribution only if license conditions are met, including preservation of copyright and license notices, clear notice of modifications, and provision of the complete corresponding source code for distributed binaries (including required build/install scripts), and, where applicable, source availability to remote network users under AGPL Section 13. The reported repository/release reproduces and distributes our copyrighted work (or derivative work) without satisfying these AGPL-3.0 conditions, so the distribution is unauthorized.
```

### If the original work ... is available online, please provide a URL.

```text
https://github.com/1bananachicken/MaaNTE
https://docs.maante.org
```

### Entire repository or specific files?

If for infringement cases involving the entire warehouse:

```text
Based on the above, I confirm that the entire contents of the repository are infringing.
```

### Identify the full repository URL that is infringing:

```text
https://github.com/<user>/<repo>
```

### Do you claim to have any technological measures...?

```text
No. This notice is based on copyright/license infringement (AGPL-3.0 non-compliance), not anti-circumvention.
```

### Forks Fields

- When not checked one by one:

```text
None at this time. I am currently reporting only the parent repository. If infringing forks are identified, they will be submitted separately.
```

- Only at fork network over then 100 and you haved to check the files, use for the “all or most forks are infringing”.

### Is the work licensed under an open source license?

```text
Yes.
```

### Which license?

Preferred for `GNU Affero General Public License v3.0 (AGPL-3.0)`。
If AGPL is not listed in the form dropdown, select the closest item and clearly write it in the subsequent description. `AGPL-3.0`。

### How do you believe the license is being violated?

```text
I believe the license is being violated because the repository and its release artifacts distribute a modified/repackaged version of our AGPL-3.0 work without complying with AGPL conditions. In particular, the distribution does not provide the complete corresponding source code for the exact binaries being distributed, does not provide clear/prominent notices of modifications and provenance, and does not preserve required license/copyright notices in a compliant manner. As a result, the redistribution is outside the scope of AGPL-3.0 permissions (including obligations under AGPL v3 sections 4–6, and section 13 where applicable).
```

### What changes can be made to bring the project into compliance...?

```text
To bring the project into AGPL-3.0 compliance, the maintainer must do one of the following:
1) Remove all infringing content and release artifacts; or
2) Fully comply with AGPL-3.0 for all distributed binaries by:
- Publishing the complete corresponding source code for the exact released binaries (including build/install scripts and required dependencies/instructions).
- Keeping copyright notices and including the full AGPL-3.0 license text.
- Clearly marking all modifications and their dates, and identifying upstream origin.
- Providing prominent notice in the repository and releases that the work is AGPL-3.0 licensed and where the source can be obtained.
- If the software is used over a network, providing source access to remote users as required by AGPL-3.0 Section 13.
Until these conditions are met, distribution of the current repository/release artifacts should stop.
```

### Do you have the alleged infringer’s contact information?

```text
Only public contact information is known:
- GitHub username: <user>
- Profile: https://github.com/<user>
- Repository: https://github.com/<user>/<repo>
I do not have verified private contact details (email/phone/address).
```

## Abuse Report Additional templates (containing toxic products)

Used to emphasize "the risk of malicious release of products", it is recommended to submit it at the same time as DMCA.

```text
The repository release artifact appears malicious based on security testing.
The tested sample SHA256 is <sha256>, and it was detected by a security engine as: QVM.Gen.196650 (generic malware detection).
Please review and take action under GitHub’s Active Malware/Abuse policies.
```

Chinese version available:：

```text
倉庫產物存在安全風險。我們對該倉庫發布的可執行檔進行了檢測，樣本 SHA256 為 <sha256>，被安全引擎檢出為：QVM.Gen.196650（惡意程式泛型檢測）。請 GitHub 依 Active Malware/Abuse 政策覆核並處置相關發佈內容。
```

## Archive Recommendations

After each submission, it is recommended to record the following internally:

- Submission time (UTC+8)
- Target repository URL
- Sample SHA256
- Ticket number (GitHub upload)
- Current status (submitted / follow-up / resolved)
This template can be directly copied to a new case; simply replace the spaces with `<...>` placeholders.