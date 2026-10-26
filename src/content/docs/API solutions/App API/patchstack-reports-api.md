---
title: "Generating and downloading reports"
hidden: false
sidebar:
  order: 4
---

_Generating reports through the Patchstack App API is available for the Developer and Enterprise plan users_

You can generate [security reports](/patchstack-app/reports/reports-overview/) and download their PDFs over the [Patchstack App API](/api-solutions/app-api/patchstack-app-api/), for example to send monthly reports to your customers from your own platform.

Reports are generated in the background, so getting a PDF takes three steps:

1. Request a report with [`POST /report/generate/{site}`](https://api.patchstack.com/app-api/documentation)
2. Find the finished report with [`POST /report/reports`](https://api.patchstack.com/app-api/documentation)
3. Download the PDF from the report's `download_url`

All examples use the App API root URL `https://api.patchstack.com/monitor/`. Replace `YOUR_APP_API_KEY` with your own [Patchstack App API key](/api-solutions/app-api/patchstack-app-api/#how-to-get-patchstack-app-api-key) and `12345` with your site identifier.

### 1. Generate a report

Send the report `type`, either `snapshot` or `developer`. A Developer report also needs a `from` and `to` date in the `D-M-YYYY` format.

```bash
curl -X POST "https://api.patchstack.com/monitor/report/generate/12345" \
  -H "UserToken: YOUR_APP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type": "developer", "from": "1-9-2026", "to": "30-9-2026"}'
```

The response only confirms that the report was queued. It does not contain the PDF:

```json
{ "success": "The generation request has been sent." }
```

### 2. Find the generated report

A report shows up in the report list once it is ready. A Developer report can take a few minutes. List the reports for the site, newest first:

```bash
curl -X POST "https://api.patchstack.com/monitor/report/reports" \
  -H "UserToken: YOUR_APP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"page": 1, "application": "12345"}'
```

Each report in the response has a `download_url`:

```json
{
  "reports": [
    {
      "id": 1,
      "site_id": 12345,
      "type": "developer",
      "hash": "1/1-eb0b4a0e-2866-436c-a7ee-cfffda415d21.pdf",
      "raw_hash": "1-eb0b4a0e-2866-436c-a7ee-cfffda415d21",
      "download_url": "https://api.patchstack.com/monitor/report/fetch/1-eb0b4a0e-2866-436c-a7ee-cfffda415d21",
      "created_at": "2026-10-01 03:09:02"
    }
  ],
  "total": 1
}
```

To wait for a report you just requested, poll this endpoint until a new report for the site appears, for example once a minute. Compare its `id` with the newest report you saw before generating.

### 3. Download the PDF

Request the report's `download_url`. It redirects to a temporary link for the PDF, so tell your HTTP client to follow redirects:

```bash
curl -L -o report.pdf "https://api.patchstack.com/monitor/report/fetch/1-eb0b4a0e-2866-436c-a7ee-cfffda415d21"
```

- The download URL needs no API key, so you can hand it to your customer as it is.
- The temporary link it redirects to is valid for one week. The `download_url` itself keeps working, so request it again for a fresh link.
- If you build the URL yourself, use `raw_hash`, not `hash`. `raw_hash` is `hash` without the leading folder and the `.pdf` extension.
- An unknown hash returns a `422` response with `{"error": "The given report could not be found."}`.

:::caution[Treat download URLs like passwords]
Anyone with a report's download URL can download that report. Only share it with the people the report is meant for.
:::

### Scheduled reports

To get reports on a fixed schedule instead, create a schedule with [`POST /report/schedule/{site}/create`](https://api.patchstack.com/app-api/documentation). Scheduled reports show up in the same report list, so you can download them the same way. See [Scheduling reports](/patchstack-app/reports/scheduling-reports/) for how schedules work.
