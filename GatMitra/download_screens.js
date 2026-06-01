const fs = require('fs');
const path = require('path');
const https = require('https');

const SCREENS = [
  {
    path: "login",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MmQ4YWFiYzE3MTcwN2M0YzU3N2E2MTI0ZjMzEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "otp-success",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzhhNjZhYWUwOTJhZjQ5NzNhYzlhY2M5MDVjMTRlMzQ5EgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "admin-dashboard",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzMwMDFmYzU2ZDEwNmMyNDhhYWZmMWRjMWVkEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "admin-member-management",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzMwMmE1N2E4ODkwOTI1ZDNjNTA0M2NmMGMwEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "add-member",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzMwM2ExYzc2ZmQwMzgzOGU2MjczMzVmZWJmEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "member-details",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzMwMzQzMGE5YmEwNDczNjFhODI2MjM2ZTIxEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "member-status-drawer",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzJkYjI3NDY2OGQ0MTRkY2M5OGExOTA4ZmFkOTUyNGVjEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "bachatgat-management",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzJmY2IwNGRhODEwMDMwM2ZiNzVhMDMwMGFlEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "add-bachatgat",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MmQ5MWM2MzVkNWYwMDMwM2UzOWZmMTc3NzYwEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "edit-bachatgat",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MmQ5MWI1MjliZDQwODE2YzIzOTQ0MzhlMTNkEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "bachatgat-details",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MmQ5MWQ1NzIxZWEwMGFkZjFmNjYzMWU0ZGEyEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "admin-audits",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzMwM2JmMWRmNDgwMjJkNTc1OTFkMGFhNTc2EgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "member-dashboard",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzMwNzUxYzAxZTcwODE2YzgyZDg2MmE2MzhmEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "superadmin-dashboard",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzYzZjliMGNlN2QwODRlN2NiZGYwOTI0MzVkOTIwNWIwEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "superadmin-notifications",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzMwNDkyOWRhNTgwMDMwMzMyZmRkMjA1MjJlEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "superadmin-audits",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzJmZDZhOTU3MDAwMzMyY2VjNWFkMDg2MWE3EgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "notifications",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzMwMDQ1OTQyYWMwOTM0ZDBmZjdhMDBiOTE0EgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "unauthorized",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MmQ4YWVhZTVmMzYwMGFkYzBiOTUwM2I0MjY1EgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "deactivated",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MmQ4YWFlOWVjMjkwMWE2MzEzMGJmMTY3ODBlEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  },
  {
    path: "session-expired",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MmQ4YWFlMTMxYTAwMWE2MzEzMGJmMTY3ODBlEgsSBxCo1bq37h8YAZIBJAoKcHJvamVjdF9pZBIWQhQxODM2OTIzOTc4MzIxMDQ3MTUwNA&filename=&opi=89354086"
  }
];

const destDir = path.join(__dirname, 'frontend', 'public', 'screens');

// Create destination dir
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function downloadScreen(screen) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(destDir, `${screen.path}.html`);
    const file = fs.createWriteStream(destPath);
    
    https.get(screen.url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${screen.path}, status: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${screen.path}.html successfully.`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log("Starting to download Stitch screens...");
  for (const screen of SCREENS) {
    try {
      await downloadScreen(screen);
    } catch (err) {
      console.error(`Error downloading ${screen.path}:`, err.message);
    }
  }
  console.log("All screens downloaded successfully!");
}

main();
