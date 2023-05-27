import { useEffect, useState } from "react";
import { useAuth } from "../../auth";
import { User } from "../../models";
import { useFetch } from "../../http";
import CONFIG from "../../config";
import { Container, NavDropdown, Navbar } from "react-bootstrap";

export default function UserNavbar() {
  const { resetToken } = useAuth();
  const [user, setUser] = useState({} as User);
  const { request } = useFetch();
  const logout = () => resetToken();
  useEffect(() => {
    (async () => {
      const response = await request(`${CONFIG.HOST}/users`);
      const user = await response.json();
      setUser(user);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#">Bakery Cloud</Navbar.Brand>
        <NavDropdown
          className="dropdown-menu-left"
          title={user.organization || user.fullName}
        >
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
