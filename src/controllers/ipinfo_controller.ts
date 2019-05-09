import { GetIpInformationRequest, GetIpInformationResponse, IpInformation } from "../proto/gigxRR_pb";
import { GigxRRService } from '../proto/gigxRR_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { ApiUrl } from '../global/urls_global'

function DoGetIpAddressRequest() {
  const req = new GetIpInformationRequest();
  var info = new IpInformation()
  grpc.invoke(GigxRRService.GetIpInformation, {
    request: req,
    host: ApiUrl,
    onHeaders: (headers: grpc.Metadata) => {
      console.log("onHeaders", headers);
    },
    onMessage: (responseData: GetIpInformationResponse) => {
      info = responseData.getIpInformation() === null ? JSON.parse("null") : responseData.getIpInformation();
      console.log(info.getIpAddress());
      console.log(info.getCountryFlag());
      console.log(info.getLanguageCode());
      console.log(info.getGmtOffSet());
    },
    onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
      if (code === grpc.Code.OK) {
        console.log('all ok');
      } else {
        console.log('hit an error', code, msg, trailers);
      }
    }
  });
}

export { DoGetIpAddressRequest }
