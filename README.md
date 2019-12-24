## Ref Repo for [`supertest#591`](https://github.com/visionmedia/supertest/issues/591)

> Exploring options to repurpose `supertest` suite for live server functional validation.

### Background

I recently wrote a small json api stub-server implementation as part of a functional test suite. The system I stubbed is large and dificult to virtualize, but stubbing a handful of endpoints was a quick and effective means to mock it out.

The live implementation is well documented so building the stub-server was simple:

 1. Identify the endpoints and HTTP methods to stub
 1. Inspect HTTP response json payloads
 1. Implement methods in the stub-server to match
 1. Test (with `supertest`) the stub-server responses 
 
Then I got the idea:

> :bulb: Can I point my `supertest` suite against the live service? I can subset the suite to run only the idempotent method tests... This would be helpful validation if I could "swap" targets from _stub-server_ to _live-service_ and observe that they behave identically.

So I jumped onto the GitHub issue boards looking for a recipe or a `supertest` built-in or something helpful in the docs. I saw [#591](https://github.com/visionmedia/supertest/issues/591) and decided to explore a bit.

### Representative Use Case

Recreating my _actual_ use case above:

 * For the _live-service_, let's use the StarWarsAPI [SWAPI](https://swapi.co/)
 * For the _stubbed-service_, let's say I only need a few representative `/people` requests
 * While working on this example, my TDD workflow was same as before:
   - What does a `/people` res look like?
   - Write `supertest` spec & stub-server impl
   - Run suite against local stubs :smiley:
   - Run suite against live service? :thinking:

### Recipe / Request for Comment

I found this useful enough to share. I've been using `supertest` for only a day, but I thought this "recipe" could be worth sharing. Perhaps a good addition to the docs or maybe something worth considering into the library itself. I'm happy to help out when I can. :thumbsup:

#### Running Tests

```sh
# Run local
npm run test
```

```sh
# Run against a live server
DO_IT_LIVE=true npm run test
```

#### How it Works

The `supertest` default export [accepts a `requestListener` function](https://github.com/visionmedia/supertest/blob/910a11133b94d44f8ac380a8a46bfdab2bce9f19/index.js#L21-L23) argument. Instead of passing in the `express` app module, we pass an [`http-proxy`](https://www.npmjs.com/package/http-proxy) callback. Then we take it a step further by floating `app` as a global in `Jest` environments and use `ENV` vars to toggle the behavior.
