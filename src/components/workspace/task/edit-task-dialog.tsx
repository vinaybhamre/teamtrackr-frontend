import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditTaskDialogType } from "@/types/api.type";
import EditTaskForm from "./edit-task-form";

const EditTaskDialog = ({
  task,
  projectId,
  isEditOpen,
  handleEditClose,
}: EditTaskDialogType) => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   console.log("ProjectId from edittaskdialog: ", projectId);

  const onClose = () => {
    handleEditClose();
  };

  return (
    <div>
      <Dialog open={isEditOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
          <EditTaskForm projectId={projectId} task={task} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTaskDialog;
