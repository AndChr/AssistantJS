import { ExecutableExtension, Component, MessageBus } from "ioc-container";
import { RequestContext } from "../root/interfaces";

export declare type intent = string | GenericIntent;
export declare type userID = string | undefined;

export const componentInterfaces = {
  "requestProcessor": Symbol("request-processor"),
};

export interface ResponseFactory {
  createVoiceResponse(): Voiceable;
}

export interface Voiceable {
  endSessionWith(text: String);
  prompt(text: String);
}

/** Builder interfaces */

export interface BuildIntentConfiguration {
  intent: intent;
  utterances: string[];
  parameters: string[];
}

export interface BuilderUtteranceTemplateService {
  getUtterancesFor(language: string): {[intent: string]: string[]};
}

export interface PlatformBuilder {
  execute(language: string, buildDir: string, intentConfigurations: BuildIntentConfiguration[], parameterMapping: BuilderParameterMapping);
}

export interface BuilderParameterMapping {
  [type: string]: string;
}

export interface ParameterDictionary {
  store: {[name: string]: any};
  contains(name: string): boolean;
  get(name: string): any | undefined;
  set(name: string, value: any);
}

export interface ConversationContext {
  "core:conversation": {
    parsedBody: any;
    user: { identifier?: string, temporalIdentifier?: string };
    parameters: { [name: string]: any; };
    platform: string;
    initialIntent: intent;
    sessionID: string;
    language: string;
  };
}

// Implememt this request in a platform to be able to get and react to http requests
export interface RequestConversationExtractor {
  component: Component;
  fits(context: RequestContext): Promise<boolean>;
  extract(context: RequestContext): Promise<MinimalRequestExtraction>;
}

export enum GenericIntent {
  Invoke,
  EndSession,
  Unhandled,
  Help,
  Yes,
  No,
  Cancel
}

export namespace GenericIntent {
  /**
   * Returns true if a given platform intent is speakable. Unspeakable intents
   * are only callable implicitly, for example GenericIntent.EndSession if session was ended by client.
   * @param platform intent to check
   */
  export function isSpeakable(intent: GenericIntent) {
    let unspeakableIntents: GenericIntent[] = [
      GenericIntent.Invoke,
      GenericIntent.EndSession,
      GenericIntent.Unhandled
    ];

    return unspeakableIntents.indexOf(intent) === -1;
  }
}

export interface GenericPlatformHandle {
  readonly platformComponent: Component;
  readonly messageBus: MessageBus;
  readonly isActive: boolean;
  tell(message: string, endSession?: boolean): void;
  endSession(): void;
  assign(responsePart: any): void;
  forceAuthentication(message: string): void;
}

export interface MinimalRequestExtraction {
  entities?: { [name: string]: any; };
  readonly intent: intent;
  readonly sessionID: string;
  readonly language: string;
}

export interface OptionalConfiguration {
  utterancePath?: string;
}

export interface Configuration extends OptionalConfiguration {

}