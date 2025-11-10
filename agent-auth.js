// agent-auth.js - The logic for Agent Registration and Login

document.addEventListener('DOMContentLoaded', () => {
    // Check for required global Firebase services
    if (!window.auth || !window.db || !window.createUserWithEmailAndPassword) {
        console.error("Firebase Auth or Firestore services not initialized on this page.");
        return; 
    }

    const authForm = document.getElementById('authForm');
    const authButton = document.getElementById('auth-button');
    const toggleLink = document.getElementById('toggle-auth');
    const authError = document.getElementById('auth-error');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    let isRegistering = false;

    const displayError = (message) => {
        authError.textContent = message;
        authError.style.display = 'block';
        setTimeout(() => {
            authError.style.display = 'none';
        }, 5000);
    };

    const toggleMode = (e) => {
        e.preventDefault();
        isRegistering = !isRegistering;
        const heading = document.querySelector('.login-container h2');
        
        if (isRegistering) {
            authButton.textContent = 'Register';
            toggleLink.textContent = 'Login here';
            heading.textContent = 'Agent Registration';
        } else {
            authButton.textContent = 'Login';
            toggleLink.textContent = 'Register here';
            heading.textContent = 'Agent Login';
        }
        authError.style.display = 'none';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        authButton.disabled = true;
        authButton.textContent = isRegistering ? 'Registering...' : 'Logging in...';
        authError.style.display = 'none';

        try {
            if (isRegistering) {
                // 🛑 Use the modular function
                const userCredential = await window.createUserWithEmailAndPassword(window.auth, email, password);
                const user = userCredential.user;

                // 🛑 Store Agent metadata in Firestore using modular functions
                await window.setDoc(window.doc(window.db, "agents", user.uid), {
                    email: user.email,
                    isVerified: false, 
                    dateJoined: new Date().toISOString()
                });
                
                alert("Registration successful! You can now log in.");
                toggleMode({preventDefault: () => {}}); 
                
            } else {
                // 🛑 Use the modular function
                await window.signInWithEmailAndPassword(window.auth, email, password);
                
                // Success: Redirect to a protected dashboard (to be created)
                window.location.href = "agent-dashboard.html"; 
            }

        } catch (error) {
            let message = error.message;
            // Handle common auth errors
            if (error.code.includes('weak-password')) {
                message = "Password must be at least 6 characters long.";
            } else if (error.code.includes('email-already-in-use')) {
                message = "This email is already registered.";
            } else if (error.code.includes('user-not-found') || error.code.includes('wrong-password')) {
                message = "Invalid email or password.";
            }

            displayError(message);
        } finally {
            authButton.disabled = false;
            authButton.textContent = isRegistering ? 'Register' : 'Login';
        }
    };

    authForm.addEventListener('submit', handleSubmit);
    toggleLink.addEventListener('click', toggleMode);
});