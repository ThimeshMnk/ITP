import React from "react";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import { useNavigate } from "react-router-dom";
import "../../styles/addTask.css";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddTask(props) {
  const { openPopup, setOpenPopup } = props;

  var arr = [];

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [stage, setStage] = useState("");
  const [assignee, setAsignee] = useState(arr);
  const [priority, setPriority] = useState("");
  const [creditPoints, setCreditPoints] = useState();
  const navigate = useNavigate();

  //get the project id and request for project team details

  const [projectEmp, setProjectEmp] = useState([
    {
      id: 1,
      name: "Akith Wijesundara",
      title: "SE",
    },
    {
      id: 2,
      name: "Shenal De Silva",
      title: "Frontend Dev",
    },
    {
      id: 3,
      name: "Hashan Perera",
      title: "Backend dev",
    },
    {
      id: 4,
      name: "Gihani Rathnayake",
      title: "QA",
    },
  ]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(projectEmp);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  function assign() {
    console.log("function called");
    var count = 0;
    users.map((user) => {
      if (user.isChecked == true) {
        console.log("inside");
        var name = user.name;
        console.log(name);
        arr[count] = name;
        count++;
        //setAsignee(user)//error is here
      }
    });
    console.log(arr);
    //setAsignee(arr)
    console.log(assignee);
  }

  //take the qa engineers from the projectemp and assign here
  const [qa, setQa] = useState([
    // {
    // id:4,
    // name:"Gihani Rathnayake",
    // title:"QA"
    // }
  ]);

  //function to filter qa not working
  const filterQa = (projectEmp) => {
    projectEmp.map((emp) => {
      if (emp.title == "QA") {
        setQa(emp);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    assign();
    //array eken dapan ballek wage asignee wa
    console.log(
      taskName +
        " " +
        dueDate +
        " " +
        stage +
        " " +
        priority +
        " " +
        creditPoints +
        " " +
        description +
        " " +
        assignee
    );
    console.log(users);
    //const newStudent = {};

    //sending data to the backend
    // axios.post("http://localhost:8070/student/add",newStudent)
    //     .then(()=>{alert("Inserted")})
    //     .catch((err)=>{alert("Error: "+err)});
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
    >
      <div className="popup">
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <p className="popupTitle">Add Task</p>
            <ClearIcon
              onClick={() => {
                setOpenPopup(false);
              }}
              sx={{
                cursor: "pointer",
                color: "var(--blue)",
                fontSize: "1.7rem",
                marginTop: "6px",
                marginRight: "10px",
              }}
            />
          </div>

          <Divider
            sx={{
              height: "1px",
              backgroundColor: "var(--dark)",
            }}
          />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label for="name" className="text">
                  Task Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Task name"
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label for="date" className="text">
                  Due Date
                </label>
                <input
                  type="date"
                  class="form-control"
                  placeholder="Click to choose date"
                  onChange={(e) => {
                    setDueDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="Status" className="text">
                  Status
                </label>
                <select
                  class="form-control"
                  onChange={(e) => {
                    setStage(e.target.value);
                  }}
                >
                  <option value={1}>Not Started</option>
                  <option value={2}>Started</option>
                  <option value={3}>In Progress</option>
                  <option value={4}>Near Completion</option>
                  <option value={5}>Completed</option>
                  <option value={6}>Review</option>
                  <option value={7}>Done</option>
                </select>
              </div>
              <div className="col">
                <label for="priority" className="text">
                  Priority
                </label>
                <select
                  class="form-control"
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                </select>
              </div>
              <div className="col">
                <label for="credits" className="text">
                  Credit Points
                </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Select Credit Points"
                  onChange={(e) => {
                    setCreditPoints(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label for="description" className="text">
                Description
              </label>
              <textarea
                class="form-control"
                id="description"
                rows="5"
                placeholder="Enter description about the task..."
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="from-group mb-3">
              <label for="addMembers" className="text">
                Add Asignee
              </label>
              {projectEmp.map((user) => (
                <>
                  <div className="from-group d-flex justify-content-between">
                    <div className="d-flex m-1">
                      <Avatar
                        alt={user.name}
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24, marginRight: 2 }}
                      />
                      <label className="form-check-label" for="defaultCheck1">
                        {user.name}
                      </label>
                    </div>

                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={user.name}
                      // checked={user?.isChecked || false}
                      onClick={handleChange}
                    />
                  </div>
                </>
              ))}
            </div>
            <div className="form-group">
              <label for="description" className="text">
                Next Asignee
              </label>
              {qa.map((emp) => (
                <>
                  <div className="from-group d-flex justify-content-between">
                    <div className="d-flex m-1">
                      <Avatar
                        alt={emp.name}
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24, marginRight: 2 }}
                      />
                      <label className="form-check-label" for="defaultCheck1">
                        {emp.name}
                      </label>
                    </div>

                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={emp.id}
                      id="defaultCheck1"
                    />
                  </div>
                </>
              ))}
            </div>
            <div className="button">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  type="reset"
                  startIcon={<DeleteIcon />}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<BeenhereOutlinedIcon />}
                >
                  Save
                </Button>
              </Stack>
            </div>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
