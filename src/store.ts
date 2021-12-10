import { writable } from 'svelte/store';
import { ConsoleContext, UserContext } from "./shuffle_hello.js";
import { Client } from "./shuffle_client.js";

export const consoleConfig = writable({
  api: "http://localhost:8080",
  address: "0x8545691D935963427ABC2931F260EE27",
  privateKey: "a0e4a8149df1b77233a665b541e81bfe1f27770b28d330b7918030f452a13fd3",
})

export const message = writable("hello blockchain");
