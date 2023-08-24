const keys = process.env.NODE_ENV === "production" ? require("./prod").default : require("./dev").default

export default keys;
