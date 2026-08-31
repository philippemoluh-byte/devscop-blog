# OWASP Juice Shop Master Project

The OWASP Juice Shop project documentation has been expanded with detailed descriptions, objectives, and mitigation steps for a range of challenges. These additions provide clear instructions and explanations for challenges such as the "GDPR Data Erasure Index," "Forgotten Developer Backup," and "Access Log," turning this documentation into a comprehensive resource for learning about web application security and ethical hacking techniques.

## Table of Contents

    - [Prerequisites](#prerequisites)
    - [Quickstart](#quickstart)
    - [Challenge Overview](#challenge-overview)
        - [GDPR Data Erasure Index](#gdpr-data-erasure-index)
        - [Forgotten Developer Backup](#forgotten-developer-backup)
        - [Access Log](#access-log)
    - [Disclaimer](#disclaimer)

## Prerequisites

- Kali Linux
- Mozilla Firefox
- Node.js and npm installed
- OWASP Juice Shop cloned locally

## Quickstart

Navigate to the project directory:

```bash
cd /path/to/your/OWASP-juice-shop-master
```

Install the dependencies and build the image:

```bash
npm install
```

Start the application:

```bash
npm start
```

Make sure OWASP Juice Shop is running by opening Firefox and navigating to:

```
<your-local-host:3000>
```

## Challenge Overview

### GDPR Data Erasure Index

| Field | Value |
|---|---|
| **Description** | Login with the (deleted) user account of Chris |
| **Category** | Broken Authentication |
| **Difficulty** | ⭐⭐⭐ (3/6 in Juice Shop) |
| **Objective** | Log in as the user `Chris`, whose account is marked as deleted (`deletedAt IS NOT NULL`), without knowing the correct password |

This challenge tests whether Juice Shop's login logic is vulnerable to SQL injection, and whether "soft" delete restrictions (soft delete) can be bypassed.

Loom Video: [GDPR Data Erasure Video](https://www.loom.com/share/cbd57c72bd5240a9ba40137db4c045f4)
Details: [See GDPR Data Erasure doc](./gdpr-data-erasure/gdpr-data-erasure.md)

### Forgotten Developer Backup

| Field | Value |
|---|---|
| **Description** | "Access a developer's forgotten backup file." |
| **Category** | Improper Input Validation |
| **Difficulty** | ⭐⭐⭐⭐ (4/6 in Juice Shop) |
| **Objective** | Access the backup file `package.json.bak` in the application's FTP directory, even though direct access is blocked by a file type check |

This challenge tests whether a server-side file type whitelist can be bypassed using a so-called poison null byte, allowing the download of files that would otherwise be blocked — in this case, a forgotten developer backup file.

Loom Video: [Forgotten Developer Backup Video](https://www.loom.com/share/f31fc1c5ee964cdaa34b5872e0b1a2e7)
Details: [See Forgotten Developer Backup doc](./forgotten-developer-backup/forgotten-developer-backup.md)

### Access Log

| Field | Value |
|---|---|
| **Description** | "Gain access to any access log file of the server." |
| **Category** | Sensitive Data Exposure |
| **Difficulty** | ⭐⭐⭐⭐ (4/6 in Juice Shop) |
| **Objective** | Access at least one access log file of the server through a publicly accessible, unprotected directory |
| **Prerequisite** | Login as a support staff member (`support@juice-sh.op`) — this is itself part of a separate challenge ("Login Support Team") |

This challenge demonstrates how a directory listing endpoint, intended to be used only internally by the support team, can be discovered and accessed externally due to a lack of access control and reliance on obscurity ("security through obscurity").

Loom Video: [Access Log Video](https://www.loom.com/share/56cb27c844cb448aaca8c0af9ebaa4f5)
Details: [See Access Log doc](./access-log/access-log.md)

## Disclaimer
:::danger

OWASP Juice Shop is an intentionally vulnerable application created for educational purposes. It should only be used in a controlled environment for learning about web application security and ethical hacking techniques.

:::
