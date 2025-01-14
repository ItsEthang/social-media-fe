import { Box, Typography } from "@mui/joy";
import MessageIcon from '@mui/icons-material/Message';

export default function BalayHubLogo() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', userSelect: 'none', cursor: 'default' }}>
            <Typography level="h3" data-testid="BHLogoText">Balay Hub</Typography>
            <MessageIcon color="primary" sx={{ transform: "translateY(-50%)" }} />
        </Box>
    )
}