import { RootStore, RootStoreModel } from "./root-store";
import { unprotect } from "mobx-state-tree";
import {Environment} from "../environment";

export async function createEnvironment() {
  const env = new Environment();
  await env.setup();
  return env;
}

export async function setupRootStore() {
  const env = await createEnvironment();

  const rootStore: RootStore = RootStoreModel.create({}, env);
  console.log("environment setted", env)
  unprotect(rootStore);

  return rootStore;
}
