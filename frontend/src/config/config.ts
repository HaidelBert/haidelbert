
export function getUserApiBaseUrl(): string {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:9090';
  } else if (window.location.hostname === 'frontend-staging.haidelbert.io') {
    return 'http://api-staging.haidelbert.io';
  }
}

export function getAccountingApiBaseUrl() {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:9091';
  } else if (window.location.hostname === 'frontend-staging.haidelbert.io') {
    return 'http://api-staging.haidelbert.io';
  }
}
