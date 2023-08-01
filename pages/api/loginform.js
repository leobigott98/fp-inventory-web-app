export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    // Sends a HTTP success code
    res.status(200).json({ data: `${body.email} ${body.password}` })
  }