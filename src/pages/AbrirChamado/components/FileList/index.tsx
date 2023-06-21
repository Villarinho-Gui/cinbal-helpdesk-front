import React, { ReactNode, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import {
  Button,
  Card,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { useHelpDeskContext } from '../../../../shared/contexts/HelpDeskContext'
import { filesize } from 'filesize'
interface FileProps {
  file: File
  onDeleteFile: (attachedFileToDelete: any) => void
}

export const FileList: React.FC<FileProps> = ({ file, onDeleteFile }) => {
  const [openDialogAlert, setOpenDialogAlert] = useState(false)
  const { isLoading } = useHelpDeskContext()

  function triggerDeleteImage() {
    onDeleteFile(file)
  }

  const triggerOpenDialogAlert = () => {
    setOpenDialogAlert(true)
  }

  const triggerCloseDialogAlert = () => {
    setOpenDialogAlert(false)
  }

  return (
    <Card
      component={Box}
      overflow={'hidden'}
      display={'flex'}
      alignItems={'center'}
      width={'350px'}
      justifyContent={'space-between'}
      color="#444"
      padding={'0.5rem'}
      borderRadius={'8px'}
      variant="outlined"
    >
      <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
        <img
          src={URL.createObjectURL(file)}
          alt=""
          height={40}
          width={40}
          style={{ borderRadius: '5px' }}
        />
        <Box
          display={'flex'}
          width={'200px'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: '16px' }}
              width={'20ch'}
              noWrap
            >
              {file.name}
            </Typography>
          </Box>
          <Box fontSize={'0.75rem'} marginTop={'4px'} width={'70%'}>
            <Typography variant="body2" fontSize={'12px'} color="#999">
              {filesize(file.size) as ReactNode}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        color="error"
        onClick={triggerOpenDialogAlert}
        disabled={isLoading}
      >
        <MdDelete size={25} />
      </Button>
      <Dialog open={openDialogAlert} onClose={triggerCloseDialogAlert}>
        <DialogTitle>Tem certeza disso?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Ao apagar esta imagem você não estará enviado ela.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={triggerCloseDialogAlert}
            variant="outlined"
            color="error"
          >
            Cancelar
          </Button>
          <Button
            onClick={triggerDeleteImage}
            autoFocus
            variant="contained"
            disableElevation
          >
            Apagar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
