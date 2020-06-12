import React from "react";
import PropTypes from "prop-types";
import MoveBook from "./MoveBook/MoveBook";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  media: {
    height: 250,
    width: 200,
  },
  root: {
    width: 200,
    height: 400,
    display: "inline-block",
  },
  title: {
    height: 40,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  content: {
    height: 25,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export default function Book(props) {
  const classes = useStyles();
  const { book, onUpdateBook } = props;
  const NO_IMG_THUMBNAIL =
    "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
  return (
    <div className="book">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              book.hasOwnProperty("imageLinks")
                ? book.imageLinks.smallThumbnail
                : NO_IMG_THUMBNAIL
            }
            title={`Thumbnail for ${book.title}`}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              {book.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {book.pageCount && `Pages: ${book.pageCount}`}<br/>
              {book.authors && `Author(s): ${book.authors.join(", ")}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <MoveBook book={book} onUpdateBook={onUpdateBook} />{" "}
          {/* Select input for moving book to another shelf */}
        </CardActions>
      </Card>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};
