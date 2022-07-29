export default {
  name: "reaction",
  title: "Reaction",
  type: "document",
  fields: [
    {
      name: "emoji",
      title: "Emoji",
      type: "string",
    },
    {
      name: "userRef",
      title: "UserRef",
      type: "reference",
      to: [{ type: "user" }],
    },
  ],
};
