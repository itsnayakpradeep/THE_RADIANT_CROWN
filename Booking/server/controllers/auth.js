export const showMessage = (req, res) => {
    res.status(200).send(`here the message: ${req.params.message}`);
};