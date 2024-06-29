document.addEventListener('DOMContentLoaded', () => {
    const updateProfileForm = document.getElementById('updateProfileForm');
  
    if (updateProfileForm) {
      updateProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const age = e.target.age.value;
        const gender = e.target.gender.value;
        const weight = e.target.weight.value;
        const height = e.target.height.value;
        const dietaryPreferences = e.target.dietaryPreferences.value.split(',').map(pref => pref.trim());
        const allergies = e.target.allergies.value.split(',').map(allergy => allergy.trim());
        const healthGoals = e.target.healthGoals.value.split(',').map(goal => goal.trim());
  
        // Example client-side validation (add more as needed)
        if (!age || !gender || !weight || !height) {
          alert('Please fill in all required fields.');
          return;
        }
  
        // Disable form submission button while processing
        const submitBtn = updateProfileForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
  
        // Simulate a fetch request to update profile (replace with actual fetch call to your API)
        // For demonstration purposes only
        try {
          const token = localStorage.getItem('token');
          const res = await fetch('/api/profile/me', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              age,
              gender,
              weight,
              height,
              dietaryPreferences,
              allergies,
              healthGoals
            })
          });
  
          if (res.ok) {
            alert('Profile updated successfully');
            // Optionally, update UI or redirect after successful update
            // window.location.href = 'profile.html';
          } else {
            const data = await res.json();
            alert(`Failed to update profile: ${data.message}`);
          }
        } catch (error) {
          console.error('Error updating profile:', error);
          alert('An error occurred while updating your profile. Please try again later.');
        } finally {
          // Re-enable form submission button
          submitBtn.disabled = false;
        }
      });
    }
  });
  