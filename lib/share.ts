export function getTwitterUrl(title: string, url: string): string {
  return `https://twitter.com/share?url=${encodeURI(url)}&text=${encodeURI(
    title
  )}`
}

export function getFacebookUrl(url: string): string {
  return `http://www.facebook.com/share.php?u=${encodeURI(url)}`
}

export function getLineUrl(url: string): string {
  return `https://social-plugins.line.me/lineit/share?url=${encodeURI(url)}`
}
