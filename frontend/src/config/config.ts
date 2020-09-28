
export function getUserApiBaseUrl(): string {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:9090/user/query';
  } else if (window.location.hostname === 'frontend-staging.haidelbert.io') {
    return 'http://api-staging.haidelbert.io/user/query';
  }
}