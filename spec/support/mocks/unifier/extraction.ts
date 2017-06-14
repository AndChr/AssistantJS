import { MinimalRequestExtraction, intent, GenericIntent } from "../../../../src/components/unifier/interfaces";
import { ResponseHandler } from "./handler";
import { Component } from "../util/component";

export function createExtraction(intent: intent = GenericIntent.Yes, entities = {}, sessionId = "session-" + Math.random(), language = "de-DE"): MinimalRequestExtraction {
  return {
    intent: intent,
    sessionID: sessionId,
    entities: entities,
    language: language,
    component: new Component("ExtractorComponent"),
    getHandler: () => new ResponseHandler()
  }
}

export const extraction = createExtraction();