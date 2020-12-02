
export function getProjects(){
  return fetch(`https://api.rainbowkereru.com/projects/public`).then((r) => r.json())
}
