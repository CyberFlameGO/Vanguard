import {
  CommandHandler,
  useDescription,
  useRole,
  createElement,
  Message,
  Embed,
  Field
} from "slshx";
import {isAdmin,createLog} from "../../../utils";

export default function remove(): CommandHandler<Env> {
  useDescription("removes a role from the moderation list");
  const role = useRole("role", "name of role", { required: true});
  return async (interaction, env) => {
    if(!interaction.guild_id) return <Message ephemeral>❌Error: Guild was not detected.❌</Message>;
    if(!interaction.member) return <Message ephemeral>❌Error: You must be a member of this guild to use this command.❌</Message>;
    if(!isAdmin(interaction.member.permissions)) return <Message ephemeral>❌Error: You must be an admin to use this command.❌</Message>;
    await env.KV.delete(`Config-${interaction.guild_id}-perms-${role.id}`);
    const msg = <Message ephemeral>
      <Embed
        title={"Removed Role from Moderation List"}
        timestamp={new Date()}
        color={5793266}
        footer={{text:"Command Executed by Vanguard", iconUrl:`https://cdn.discordapp.com/avatars/922374334159409173/00da613d16217aa6b2ff31e01ba25c1c.webp`}}
      >
        <Field name="Role:">{`<@&${role.id}>`}</Field>
        <Field name="Invoked by:">{`<@${interaction.member.user.id}>`}</Field>
      </Embed>
    </Message>;
    await createLog(interaction.guild_id!, msg, env);
    return msg;
  };
}