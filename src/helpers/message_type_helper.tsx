import { GeneralResponseModal } from '../modals/general_response_modal';
import { MessageModal } from '../modals/message_modal';

export function GetMessageType(generalResponseModalResponse_: GeneralResponseModal) {
    var modal = new MessageModal();
    switch (generalResponseModalResponse_.GrpcResponseCode) {
        case 0: // OK
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "success";
            return modal
        case 1: // Canceled
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 2: // Unknown
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 3: // InvalidArgument
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "warning";
            return modal
        case 4: // DeadlineExceeded
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 5: // NotFound
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 6: // AlreadyExists
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 7: // PermissionDenied
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "warning";
            return modal
        case 8: // ResourceExhausted
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 9: // FailedPrecondition
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "warning";
            return modal
        case 10: // Aborted
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 11: // OutOfRange
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 12: // Unimplemented
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 13: // Internal
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 14: // Unavailable
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 15: // DataLoss
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        case 16: // Unauthenticated
            modal.Message = generalResponseModalResponse_.GrpcResponseMessage == null ? JSON.parse("null") : generalResponseModalResponse_.GrpcResponseMessage;
            modal.MessageType = "error";
            return modal
        default:
            modal.Message = "Service is not avaible now,please tyr later.";
            modal.MessageType = "error";
            return modal

    }

}
