export function getAllContacts(next) {
    fetch(`/api/contact?user=all`)
        .then(res => res.json())
        .then(data => {
            next(data)
        })
        .catch((error) => {
            next(error)
        });
}

export function getMyContacts(user, next) {

    fetch(`/api/contact?user=` + user)
        .then(res => res.json())
        .then(data => {
            next(data)
        })
        .catch((error) => {
            next(error)
        });
}

export function updateContact(contact, next) {

    fetch(`/api/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    })
        .then(response => console.log(response));
}
export function saveNewContact(newContact, next) {

    fetch(`/api/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
    })
        .then(response => console.log(response));

}
