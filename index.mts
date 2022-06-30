// @ts-ignore
import qrcode from "qrcode-terminal";

import {
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConsoleLogger,
  HttpOutboundTransport,
  LogLevel,
  WsOutboundTransport,
} from "@aries-framework/core";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";
import { connect } from "ngrok";
import { BCOVRIN_GENESIS } from "./util.mjs";

const endpoint = await connect(3000);
const agent = new Agent(
  {
    logger: new ConsoleLogger(LogLevel.trace),
    label: "Prefix Demo",
    autoAcceptConnections: true,
    autoAcceptProofs: AutoAcceptProof.Always,
    autoAcceptCredentials: AutoAcceptCredential.Always,
    indyLedgers: [
      {
        isProduction: false,
        id: "bcovrin-test-net",
        genesisTransactions: BCOVRIN_GENESIS,
      },
    ],
    publicDidSeed: "abcabcabc12345678912332132345435",
    walletConfig: {
      id: "demo",
      key: "00000000000000000000000000000000",
    },
    endpoints: [endpoint],
  },
  agentDependencies
);

agent.registerInboundTransport(new HttpInboundTransport({ port: 3000 }));
agent.registerOutboundTransport(new HttpOutboundTransport());
agent.registerOutboundTransport(new WsOutboundTransport());

await agent.initialize();

const outOfBandRecord = await agent.oob.createInvitation();

const url = outOfBandRecord.outOfBandInvitation.toUrl({
  domain: endpoint,
});

qrcode.generate(url);
console.log(url);
