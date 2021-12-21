exports.register = (req, res) => {
    res.render(
        "pages/dashboard/CreateProfile", {
            title: "Create Profile"
        }

    );
}