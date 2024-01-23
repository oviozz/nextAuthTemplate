
export const registerHandler = async (formData) => {

    try {
        const res = await fetch(`http://localhost:3000/api/register`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
            "content-type": "application/json"
        });

        return res;
    } catch (error) {
        console.error("Error in registerHandler:", error);
        throw error; // Re-throw the error to be handled by the calling function
    }
};
