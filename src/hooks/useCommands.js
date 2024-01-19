const commands = [
  [
    ["create", "todo"],
    ["create", "to-do"],
    ["create", "to", "do"],
  ],
  [
    ["delete", "todo"],
    ["delete", "to-do"],
    ["delete", "to", "do"],
  ],
  [["mark", "as", "uncompleted"]],
  [["mark", "as", "completed"]],
];

export default function useCommands(transcript) {
  let commandIndex = -1;

  commands.some((command, index) => {
    if (
      command.some((variations) =>
        variations.every((variation) => transcript.startsWith(variation))
      )
    ) {
      commandIndex = index;
      return true;
    }
    return false;
  });

  if (commandIndex === -1) {
    if (transcript.includes("delete")) {
      commandIndex = 1;
    }
  }

  return commandIndex;
}
