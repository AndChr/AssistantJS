import { Logger } from "../../root/public-interfaces";
import { MinimalResponseHandler, OptionalHandlerFeatures } from "../public-interfaces";
import { BaseResponse } from "./base-response";

export class DataResponse extends BaseResponse {
  /** Response handler of the currently used platform */
  protected handler: OptionalHandlerFeatures.DataMessage & MinimalResponseHandler;

  constructor(handler: MinimalResponseHandler, failSilentlyOnUnsupportedFeatures: boolean, logger: Logger) {
    super(handler, failSilentlyOnUnsupportedFeatures, logger);

    this.reportIfUnavailable(OptionalHandlerFeatures.FeatureChecker.DataMessage, "The currently used platform does not support data messages.");
  }

  /**
   * Adds a data message to response
   * @param {any} dataMessage Adds another data message to response
   * @return {DataReponse} This response object for method chaining
   */
  public addDataMessage(dataMessage: any) {
    // Initialize dataMessages array
    if (typeof this.handler.dataMessages === "undefined" || this.handler.dataMessages === null) this.handler.dataMessages = [];

    // Add new message
    this.handler.dataMessages.push(dataMessage);

    return this;
  }
}
