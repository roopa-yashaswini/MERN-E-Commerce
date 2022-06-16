import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import book from '../../img/book.jpg';
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

const SingleOrderProduct = (props) => {
    const {product} = props;
    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])).toString();
    }
    

    const createPDF = () => {
        var doc = new jsPDF('portrait', 'px', 'a4', false);

        const pageWidth = doc.internal.pageSize.getWidth();
        const marginX = (pageWidth - 100) / 2;
        let marginTable = (pageWidth - 200) / 2;

        doc.text('Invoice', pageWidth/2, 20, 'center');
        doc.addImage(book, 'PNG', marginX, 50, 100, 100);
        doc.autoTable({
            theme: 'plain',
            columnStyles: { 0: { fontStyle: 'bold', fontSize: 13 }, 1: {fontSize: 11}},
            startY: 200,
            tableWidth: 200,
            body: [
              ['Order Id', product._id],
              ['Product', product.item.name],
              ['Quantity', product.quantity],
              ['Amount paid', 'Rs. '+product.amount],
              ['Ordered on', parseISOString(product.date).slice(0, 15)],
            ],
            margin:{left: marginTable, right: marginTable}
        })

        doc.save(`order-${product._id}.pdf`);
    }

    return(
        <Card sx={{ display: 'flex' }}>
            <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={`http://localhost:5000/${product.item.image}`}
            alt={product.title}
        />
            <Box sx={{ display: 'flex', flexDirection: 'column' }} style={{width: '100%'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {product.item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Rs. {product.amount}
                    </Typography>
                    <IconButton aria-label="download" onClick={createPDF} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', backgroundColor: '#E5E4E2', marginTop: '1rem'}}>
                        <FileDownloadOutlinedIcon />
                    </IconButton>
                </CardContent>
            </Box>
        </Card>
    );
}

export default SingleOrderProduct;