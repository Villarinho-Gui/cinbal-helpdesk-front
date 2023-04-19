import { Box, Icon, IconButton, TextField, useTheme } from '@mui/material'
import React from 'react'

import { BiPlus } from 'react-icons/bi'
import { Environment } from '../../environment/export'
import { useNavigate } from 'react-router-dom'

interface IBarraFerramentasAbrirChamado {
  textoBusca?: string
  mostrarInputBusca?: boolean
  aoMudarTextoDeBusca?: (novoTexto: string) => void
  mostrarBotaoNovo?: boolean
  // aoClicarEmNovo?: (novoTexto: string) => void
}

const BarraFerramentasAbrirChamado: React.FC<IBarraFerramentasAbrirChamado> = ({
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBusca = '',
  mostrarBotaoNovo = true,
}) => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box
      border="1px solid"
      borderColor={theme.palette.divider}
      borderRadius={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={1}
      paddingX={1}
      marginX={1}
      gap={1}
      height={theme.spacing(5)}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          placeholder={Environment.INPUT_DE_BUSCA}
          value={textoBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
      <Box display="flex" flex={1} justifyContent="end">
        {mostrarBotaoNovo && (
          <IconButton onClick={() => navigate('/abrir-chamado')}>
            <Icon>
              <BiPlus />
            </Icon>
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default BarraFerramentasAbrirChamado
