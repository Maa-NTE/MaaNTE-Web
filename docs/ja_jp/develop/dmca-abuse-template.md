# GitHub DMCA / Abuse 提報模板（AGPL-3.0）

用於針對仿冒倉庫、搬運倉庫、帶毒二進位倉庫進行快速提報。

適用對象：
- 我方為版權方（或版權方授權代表）
- 原項目採用 AGPL-3.0
- 對方倉庫存在未合規發放、偽裝發布、惡意樣本風險

## 官方入口

- DMCA（版權移除）：<https://github.com/contact/dmca>
- Abuse（濫用/惡意分發）：<https://support.github.com/contact/report-abuse?category=report-abuse&report=other&report_type=unspecified>

建議兩條都提：`DMCA` 處理版權，`Abuse` 處理安全風險。

## 提報前準備清單

1.原倉庫 URL（官方倉）
2. 被檢舉倉庫 URL（侵權倉）
3. 侵權行為範本下載 URL（Release 連結）
4. 樣本哈希（SHA256）
5. 檢測結論（如 `QVM.Gen.196650`）與檢測報告文件
6. AGPL-3.0 違反點（源碼提供、修改說明、許可聲明等）
7. 聯絡方式（姓名、信箱、地址、電話）

## DMCA 表單逐項模板

以下欄位依 GitHub 表單常見問題順序整理，可直接複製。

### Are you the copyright holder or authorized...?

```text
Yes, I am the copyright holder.
```

如為代理：

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

整倉侵權時使用：

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

### Forks 字段

- 未逐次核查時：

```text
None at this time. I am currently reporting only the parent repository. If infringing forks are identified, they will be submitted separately.
```

- 只在 fork 網路超過 100 且你確實抽樣核查後，才使用 “all or most forks are infringing” 語句。

### Is the work licensed under an open source license?

```text
Yes.
```

### Which license?

優先選擇 `GNU Affero General Public License v3.0 (AGPL-3.0)`。
若表單下拉沒有 AGPL，選擇最接近項目並在後續描述中明確寫 `AGPL-3.0`。

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

## Abuse Report 附加模板（含毒產物）

用於強調“發布產物存在惡意風險”，建議和 DMCA 同時提交。

```text
The repository release artifact appears malicious based on security testing.
The tested sample SHA256 is <sha256>, and it was detected by a security engine as: QVM.Gen.196650 (generic malware detection).
Please review and take action under GitHub’s Active Malware/Abuse policies.
```

中文版可用：

```text
倉庫產物存在安全風險。我們對該倉庫發布的可執行檔進行了檢測，樣本 SHA256 為 <sha256>，被安全引擎檢出為：QVM.Gen.196650（惡意程式泛型檢測）。請 GitHub 依 Active Malware/Abuse 政策覆核並處置相關發佈內容。
```

## 歸檔建議

每次提報後，建議在內部記錄：
- 提報時間（UTC+8）
- 目標倉庫 URL
- 樣本 SHA256
- 工單編號（GitHub 回傳）
- 目前狀態（submitted / follow-up / resolved）

這份範本可直接複製到新案件，按 `<...>` 佔位符替換即可。