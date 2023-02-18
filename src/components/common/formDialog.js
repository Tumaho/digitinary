import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import cookie from 'react-cookies'
import axios from "axios";



export default function FormDialog({ setShowDialog, setPosts, posts, previosTitle, previosBody, editPostsChange, onePost }) {
    const [title, setTitle] = useState(previosTitle || '')
    const [body, setBody] = useState(previosBody || '')
    const [validate, setValidate] = useState(false)

    const handleSubmit = async () => {
        if (title.trim() === "" || body.trim() === "") {
            setValidate(true);
        }
        else {

            let bodyObject = {
                title: title,
                body: body,
                userId: cookie.load('data').id
            }
            if (posts) {
                await axios.post('https://jsonplaceholder.typicode.com/posts', bodyObject)
                    .then(function (response) {
                        setPosts([...posts, response.data])
                    }).catch(function (error) {

                        console.log(error);
                    });
            }
            else {
                await axios.put(`https://jsonplaceholder.typicode.com/posts/${onePost.id}`, bodyObject)
                    .then(function (response) {
                        editPostsChange(response.data)
                    }).catch(function (error) {

                        console.log(error);
                    });
            }
            setShowDialog(false);
        }
    };

    return (
        <div>
            <Dialog
                open={true}
                onClose={() => { setShowDialog(false) }}
                aria-labelledby="edit-apartment"
            >
                <DialogTitle id="edit-apartment">Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please, edit the flat and the floor of your apartment.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        defaultValue={title}
                        onChange={(e) => { setTitle(e.target.value); }}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="body"
                        label="Body"
                        type="text"
                        fullWidth
                        defaultValue={body}
                        onChange={(e) => { setBody(e.target.value); }}

                    />
                    {validate &&
                        <DialogContentText style={{ "color": "red" }}>
                            Please fill the inputs.
                        </DialogContentText>
                    }
                </DialogContent>


                <DialogActions>
                    <Button onClick={() => { setShowDialog(false) }} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
