<script>
  import { consoleConfig, message } from "./store.js";
  import * as shuffle from "./shuffle_hello.js";
  import { Client } from "./shuffle_client.js";
  globalThis.shuffle = shuffle;

  let messageCache;
  message.subscribe(entry => (messageCache = entry));

  let configCache;
  consoleConfig.subscribe(entry => (configCache = entry));

  async function handleClick() {
    const client = new Client(configCache.api);
    console.log(client);
    const consoleContext = new shuffle.ConsoleContext(
      "ignore",
      "browser",
      "noNetworkPath",
      client,
    );

    console.log(configCache);
    const sequenceNumber = await client.sequenceNumber(configCache.address);
    console.log(sequenceNumber);
    let txn = await shuffle.invokeScriptFunctionForAddress(
      consoleContext,
      configCache.address,
      sequenceNumber,
      configCache.privateKey,
      configCache.address + "::Message::set_message",
      [],
      [shuffle.mv.Ascii(message)]
    );
    console.log(txn);
  }
</script>

<main class="antialiased text-gray-900 px-6">
  <h1>Hello Blockchain UI</h1>
  <form class="w-full max-w-lg">
    <label for="devapi" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Developer API
      <input id="devapi" type="text" bind:value={$consoleConfig.api} />
    </label>
    <label for="address">
      Address
      <input id="address" type="text" bind:value={$consoleConfig.address} />
    </label>
    <label for="key">
      Key
      <input id="key" type="text" bind:value={$consoleConfig.privateKey} />
    </label>
    <label for="message">
      Message
      <input id="message" type="text" bind:value={$message} />
    </label>
  </form>
  <p>
    {JSON.stringify($consoleConfig)}
  </p>

  <button on:click={handleClick}>
    Set Message!
</button>
</main>

<style>
	input {
    width: 400px;
	}
</style>
