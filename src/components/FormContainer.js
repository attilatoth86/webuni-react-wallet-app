import { Typography } from "@mui/material";
import { Container } from "@mui/system"

export default function FormContainer({children, formTitle, formSubTitle}) {
    return (
    <Container maxWidth="sm">
        <Typography variant="h4" marginTop={3} marginBottom={3}>
            {formTitle}
        </Typography>
        <Typography variant="body2" marginBottom={3}>
            {formSubTitle}
        </Typography>
        {children}
    </Container>
    );
}