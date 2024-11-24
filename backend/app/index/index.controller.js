exports.redirectFrontend = (req, res) => {
    try {
        console.dir('INDEX CONTROLLER')
        res.sendFile(process.env.INDEX)
    } catch(error) {
        throw error;
    }
}