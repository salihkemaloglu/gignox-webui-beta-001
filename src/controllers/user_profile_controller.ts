import { GetUserRequest, GetUserResponse, User } from "../proto/gigxRR_pb";
import { GigxRRService } from '../proto/gigxRR_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { ApiUrl } from '../global/urls_global'
import { GeneralResponseModal } from '../modals/general_response_modal'
import { lang } from 'src/services/localization_service';
var modal = new GeneralResponseModal()

export function DoGetUserRequest(username_: string, callback: any) {
  const req = new GetUserRequest();
  req.setUsername(username_);
  var response = new User();
  grpc.invoke(GigxRRService.GetUser, {
    request: req,
    host: ApiUrl,
    metadata: new grpc.Metadata({ "languagecode": lang }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData_: GetUserResponse) => {
      response = responseData_.getUser() === null ? JSON.parse("null") : responseData_.getUser();
    },
    onEnd: (code_: grpc.Code, msg_: string | undefined, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}
