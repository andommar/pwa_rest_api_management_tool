const SideBar = () => {
    return (
        <div class="sidebar-nav">
            <ul class="space-y-2">
                <li>
                    <a href="#" class="sidebar-a">
                        <fa icon="coffee"/>
                        <span class="ml-3">Dashboard</span>
                    </a>
                    <a href="#" class="sidebar-a">
                        <fa icon="coffee"/>
                        <span class="ml-3">My projects</span>
                    </a>
                    <a href="#" class="sidebar-a">
                        <fa icon="fire"/>
                        <span class="ml-3">Test</span>
                    </a>
                </li>
            </ul>
        </div>


        // <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-primary text-secondary">
        //     {/* <SideBarIcon icon='coffee' /> */}
        //     <fa icon="coffee" class="sidebar-icon"/>
        //     <fa icon="coffee" class="sidebar-icon"/>
        //     <fa icon="coffee" class="sidebar-icon"/>
        //     <fa icon="fire" size="lg" class="sidebar-icon" />
            
        // </div>
    )
};

const SideBarIcon = iconParam => {

}

export default SideBar;