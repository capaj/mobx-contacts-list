function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getDisplayName = (contact) => {
  const cfl = capitalizeFirstLetter
  return `${cfl(contact.title)}. ${cfl(contact.first)} ${cfl(contact.last)}`
}

export default getDisplayName
