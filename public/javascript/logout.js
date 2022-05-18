async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.logout-btn').addEventListener('click', logout);

async function timeoutLogout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        window.alert('session timed out, please log back in');
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

// logout after 30 seconds inactivity
const timeout = setTimeout(timeoutLogout, 30000);


