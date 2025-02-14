import profile from "../assets/toolsnew.png"

export const Website = () => {
    return <div>
        <div class="container mx-auto my-10 p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="flex items-center justify-center">
                    <img src={profile} alt="Daily Labour"  />
                </div>
                <div class="flex items-center">
                    <div>
                        <h2 class="text-3xl font-bold mb-4">Hire Daily Labour Effortlessly</h2>
                        <p class="text-gray-700 mb-4">Our platform connects you with skilled laborers for your daily needs. Whether you need help with moving, cleaning, or other tasks, we've got you covered!</p>
                        <p class="text-gray-700">Join our community of employers and laborers, and experience the convenience of hiring and working together.</p>
                    </div>
                </div>
            </div>
        </div>

        <footer class="bg-gray-800 text-white py-4 ">
            <div class="container mx-auto text-center">
                <h3 class="text-lg font-bold">About Us</h3>
                <p class="mt-2">At LabourHire, we strive to provide a seamless experience for hiring daily labor. Our mission is to connect reliable workers with those in need of their services.</p>
                <p class="mt-1">For more information, visit our website or contact us!</p>
                <div class="mt-4">
                    <a href="#" class="hover:underline">Privacy Policy</a>
                    <span class="mx-2">|</span>
                    <a href="#" class="hover:underline">Terms of Service</a>
                </div>
            </div>
        </footer>
    </div>
}