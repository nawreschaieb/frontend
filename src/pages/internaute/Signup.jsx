import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    answer: "",
    usertype: "client"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userName.trim()) {
      newErrors.userName = "Le nom d'utilisateur est requis";
    }
    
    if (!formData.email) {
      newErrors.email = "L'adresse email est requise";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = "Format de téléphone invalide";
    }
    
    if (!formData.answer) {
      newErrors.answer = "La réponse de sécurité est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Remove confirmPassword as it's not part of the backend schema
        const { confirmPassword, ...dataToSend } = formData;
        
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setErrors({ form: data.message || "Échec de l'inscription. Veuillez réessayer." });
        } else {
          // Registration success - redirect to login
          navigate("/login", { state: { message: "Inscription réussie! Vous pouvez maintenant vous connecter." } });
        }
      } catch (error) {
        setErrors({
          form: "Échec de l'inscription. Veuillez réessayer plus tard."
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Créer un compte</h1>
            <p className="text-gray-600 mt-2">Entrez vos informations pour vous inscrire</p>
          </div>
          
          {errors.form && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
              <div className="relative">
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Votre nom d'utilisateur"
                  value={formData.userName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.userName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'} focus:ring-2 focus:ring-indigo-200 transition duration-200`}
                />
                {errors.userName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.userName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'} focus:ring-2 focus:ring-indigo-200 transition duration-200`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="0600000000"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'} focus:ring-2 focus:ring-indigo-200 transition duration-200`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'} focus:ring-2 focus:ring-indigo-200 transition duration-200`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'} focus:ring-2 focus:ring-indigo-200 transition duration-200`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">Question de sécurité: Quel est votre animal préféré?</label>
              <div className="relative">
                <input
                  type="text"
                  id="answer"
                  name="answer"
                  placeholder="Votre réponse"
                  value={formData.answer}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.answer ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'} focus:ring-2 focus:ring-indigo-200 transition duration-200`}
                />
                {errors.answer && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.answer}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Inscription en cours...
                  </>
                ) : (
                  "S'inscrire"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Déjà inscrit?</span>
              </div>
            </div>

            <div className="mt-4">
              <Link 
                to="/login" 
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;