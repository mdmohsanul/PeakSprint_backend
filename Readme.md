const updateExistingUsers = async () => {
try {
const result = await Project.updateMany(
{ priority: { $exists: false } }, // Only update documents where "role" does not exist
{ $set: { priority: "High" } } // Default value for existing users
);
console.log("Updated Users:", result);
} catch (error) {
console.error("Error updating users:", error);
}
};

    updateExistingUsers();
