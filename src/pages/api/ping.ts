//@ts-ignore
export default function handler(req, res) {
  console.log("this is request -->", req);
  res.status(200).json({ message: "hello" });
}
