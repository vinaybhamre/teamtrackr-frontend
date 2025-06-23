import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  // DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Permissions } from "@/constant";
import { toast } from "@/hooks/use-toast";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { deleteTaskMutationFn } from "@/lib/api";
import { TaskType } from "@/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditTaskDialog from "../edit-task-dialog";

interface DataTableRowActionsProps {
  row: Row<TaskType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: deleteTaskMutationFn,
  });

  const taskId = row.original._id as string;
  const taskCode = row.original.taskCode;

  const handleDeleteConfirm = () => {
    if (deletePending) return;

    deleteMutate(
      { workspaceId, taskId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["all-tasks", workspaceId],
          });
          toast({
            title: "Success",
            description: "Task deleted successfully",
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <PermissionsGuard requiredPermission={Permissions.EDIT_TASK}>
            <DropdownMenuItem
              className={`cursor-pointer ${taskId}`}
              onClick={() => setOpenEditDialog(true)}
            >
              Edit Task
            </DropdownMenuItem>
          </PermissionsGuard>
          <PermissionsGuard requiredPermission={Permissions.DELETE_TASK}>
            <DropdownMenuSeparator />{" "}
            <DropdownMenuItem
              className={`!text-destructive cursor-pointer ${taskId}`}
              onClick={() => setOpenDialog(true)}
            >
              Delete Task
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </PermissionsGuard>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskDialog
        task={row.original}
        projectId={row.original.project?._id}
        isEditOpen={openEditDialog}
        handleEditClose={() => setOpenEditDialog(false)}
      />

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={deletePending}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        description={`Are you sure you want to delete ${taskCode}`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
