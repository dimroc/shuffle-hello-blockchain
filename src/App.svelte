<script>
  import { user } from "./store.js";
  import { ConsoleContext, UserContext } from "./shuffle_hello.js";
  import * as shuffle from "./shuffle_hello.js";
  globalThis.shuffle = shuffle;
</script>

<main class="antialiased text-gray-900 px-6">
  <h1>Hello Message Reader</h1>
  <form class="w-full max-w-lg">
    <label for="devapi" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Developer API
      <input id="devapi" type="text" bind:value={$user.name} />
    </label>
    <label for="address">
      Address
      <input id="address" type="text" bind:value={$user.email} />
    </label>
  </form>
  <p>
    {JSON.stringify($user)}</p>
</main>
