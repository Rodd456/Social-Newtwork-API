// modules.js
import UserModule from "./UserModule.js";
import ThoughtModule from "./ThoughtModule.js";

export default { UserModule, ThoughtModule };

// app.js
import modules from "./modules.js";
const { UserModule, ThoughtModule } = modules;
